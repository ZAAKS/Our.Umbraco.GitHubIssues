using System.Text.Json.Serialization;

namespace Our.Umbraco.GitHubIssues.Infrastructure.GitHub.Models;

public class GitHubLabelResponse
{
    [JsonPropertyName("id")]
    public long Id { get; set; }

    [JsonPropertyName("name")]
    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("color")]
    public string Color { get; set; } = string.Empty;

    [JsonPropertyName("description")]
    public string? Description { get; set; }
}
