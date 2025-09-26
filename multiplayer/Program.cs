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

	var gamesFolder = Path.Combine(Directory.GetCurrentDirectory(), "games");
	if (!Directory.Exists(gamesFolder))
		Directory.CreateDirectory(gamesFolder);

	// var fileName = $"game_{DateTime.Now:yyyyMMdd_HHmmssfff}.json";
	var filePath = Path.Combine(gamesFolder, "currentGame.json");

	// Load existing moves
	List<Dictionary<string, string>> existingData = new();
	if (File.Exists(filePath))
	{
		var json = await File.ReadAllTextAsync(filePath);
		if (!string.IsNullOrWhiteSpace(json))
		{
			try
			{
				existingData = JsonSerializer.Deserialize<List<Dictionary<string, string>>>(json)!;
			}
			catch
			{
				var singleMove = JsonSerializer.Deserialize<Dictionary<string, string>>(json);
				if (singleMove != null)
					existingData.Add(singleMove);
			}
		}
	}

	// Add the new move
	var newMove = JsonSerializer.Deserialize<Dictionary<string, string>>(body);
	if (newMove != null)
	{
		existingData.Add(newMove);
	}
	else
	{
		return Results.BadRequest(new { status = "error", message = "Invalid JSON" });
	}

	// Save updated JSON back to file
	var updatedJson = JsonSerializer.Serialize(existingData, new JsonSerializerOptions { WriteIndented = true });
	await File.WriteAllTextAsync(filePath, updatedJson);

	return Results.Ok(new { status = "saved", data = newMove });
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
