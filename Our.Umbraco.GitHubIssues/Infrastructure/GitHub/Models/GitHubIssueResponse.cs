using System.Text.Json.Serialization;

namespace Our.Umbraco.GitHubIssues.Infrastructure.GitHub.Models;

public class GitHubIssueResponse
{
    [JsonPropertyName("id")]
    public long Id { get; set; }

    [JsonPropertyName("number")]
    public int Number { get; set; }

    [JsonPropertyName("title")]
    public string Title { get; set; } = string.Empty;

    [JsonPropertyName("state")]
    public string State { get; set; } = string.Empty;

    [JsonPropertyName("html_url")]
    public string HtmlUrl { get; set; } = string.Empty;

    [JsonPropertyName("created_at")]
    public DateTime CreatedAt { get; set; }

    [JsonPropertyName("updated_at")]
    public DateTime UpdatedAt { get; set; }

    [JsonPropertyName("closed_at")]
    public DateTime? ClosedAt { get; set; }

    [JsonPropertyName("body")]
    public string? Body { get; set; }

    [JsonPropertyName("user")]
    public GitHubUserResponse? User { get; set; }

    [JsonPropertyName("labels")]
    public List<GitHubLabelResponse> Labels { get; set; } = new();

    [JsonPropertyName("comments")]
    public int Comments { get; set; }
}
