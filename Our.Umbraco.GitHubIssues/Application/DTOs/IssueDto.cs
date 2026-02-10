namespace Our.Umbraco.GitHubIssues.Application.DTOs;

public class IssueDto
{
    public long Id { get; set; }
    public int Number { get; set; }
    public string Title { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string HtmlUrl { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime? ClosedAt { get; set; }
    public string Body { get; set; } = string.Empty;
    public UserDto? User { get; set; }
    public List<LabelDto> Labels { get; set; } = new();
    public int Comments { get; set; }
    public bool IsUpForGrabs { get; set; }
}