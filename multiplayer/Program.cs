using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
	options.AddDefaultPolicy(policy =>
	{
		policy.AllowAnyOrigin()
		.AllowAnyHeader()
		.AllowAnyMethod();
	});
});

var app = builder.Build();

app.UseCors();

app.MapPost("/move", async (HttpContext context) =>
{
	using var reader = new StreamReader(context.Request.Body);
	var body = await reader.ReadToEndAsync();

	// Save to a file called "game.json"
	var filePath = Path.Combine(Directory.GetCurrentDirectory(), "game.json");

	await using var stream = new FileStream(filePath, FileMode.Create, FileAccess.Write, FileShare.ReadWrite);
	await using var writer = new StreamWriter(stream);
	await writer.WriteAsync(body);

	return Results.Ok(new { status = "saved", data = body });
});

app.MapMethods("/move", new[] { "OPTIONS" }, () =>
		Results.Ok().WithHeaders(new Dictionary<string, string>
		{
			["Access-Control-Allow-Origin"] = "*",
			["Access-Control-Allow-Methods"] = "*",
			["Access-Control-Allow-Headers"] = "*"
		})
);

app.Run();
