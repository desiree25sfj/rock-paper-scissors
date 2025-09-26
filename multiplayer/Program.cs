using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Archiver setup
var gamesFolder = Path.Combine(Directory.GetCurrentDirectory(), "games");
if (!Directory.Exists(gamesFolder))
	Directory.CreateDirectory(gamesFolder);

// Background cleanup
_ = Task.Run(async () =>
{
	while (true)
	{
		var currentFile = Path.Combine(gamesFolder, "currentGame.json");
		if (File.Exists(currentFile))
		{
			var lastWrite = File.GetLastWriteTime(currentFile);
			if (DateTime.Now - lastWrite > TimeSpan.FromMinutes(10)) // archived after 10 mins of inactivity
			{
				var timestampedName = $"game_{DateTime.Now:yyyyMMdd_HHmm}.json";
				var newPath = Path.Combine(gamesFolder, timestampedName);
				File.Move(currentFile, newPath);
				Console.WriteLine($"Archived {currentFile} as {timestampedName}");
			}
		}
		await Task.Delay(TimeSpan.FromMinutes(1)); // check every minute
	}
});


app.MapPost("/move", async (HttpContext context) =>
{
	using var reader = new StreamReader(context.Request.Body);
	var body = await reader.ReadToEndAsync();

	// Deserialize the incoming move
	var moveData = JsonSerializer.Deserialize<Dictionary<string, string>>(body);
	if (moveData == null || (!moveData.ContainsKey("player1") && !moveData.ContainsKey("player2")))
	{
		return Results.BadRequest(new { status = "error", message = "Invalid JSON" });
	}

	// Load existing rounds
	var filePath = Path.Combine(gamesFolder, "currentGame.json");
	List<Dictionary<string, string>> rounds = new();
	if (File.Exists(filePath))
	{
		var json = await File.ReadAllTextAsync(filePath);
		if (!string.IsNullOrWhiteSpace(json))
		{
			try
			{
				rounds = JsonSerializer.Deserialize<List<Dictionary<string, string>>>(json)!;
			}
			catch
			{
				// fallback for single-move (old format)
				var singleMove = JsonSerializer.Deserialize<Dictionary<string, string>>(json);
				if (singleMove != null)
				{
					rounds.Add(new Dictionary<string, string>
				{
					{ "round", "1" },
					{ "player1", singleMove.ContainsKey("player1") ? singleMove["player1"] : "" }
				});
				}
			}
		}
	}

	// Determine which round to update
	if (rounds.Count == 0 || (moveData.ContainsKey("player1") || rounds[^1].ContainsKey("player2")))
	{
		var newRound = new Dictionary<string, string>
	{
		{ "round", (rounds.Count + 1).ToString() }
	};
		foreach (var kvp in moveData)
			newRound[kvp.Key] = kvp.Value;

		rounds.Add(newRound);
	}
	else
	{
		foreach (var kvp in moveData)
			rounds[^1][kvp.Key] = kvp.Value;
	}

	// Save back to .json-file
	var updatedJson = JsonSerializer.Serialize(rounds, new JsonSerializerOptions { WriteIndented = true });
	await File.WriteAllTextAsync(filePath, updatedJson);

	return Results.Ok(new { status = "saved", data = moveData });
});


app.MapGet("/moves", async () =>
{
	var filePath = Path.Combine(Directory.GetCurrentDirectory(), "games/currentGame.json");
	if (!File.Exists(filePath))
		return Results.Ok(new List<Dictionary<string, string>>());

	var json = await File.ReadAllTextAsync(filePath);
	return Results.Content(json, "application/json");
});

app.Run();
