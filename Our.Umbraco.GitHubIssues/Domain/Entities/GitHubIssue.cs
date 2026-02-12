namespace Our.Umbraco.GitHubIssues.Domain.Entities;

public class GitHubIssue
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
    public User? User { get; set; }
    public List<Label> Labels { get; set; } = new();
    public int Comments { get; set; }
    public bool IsUpForGrabs => Labels.Any(l => 
        l.Name.Equals("community/up-for-grabs", StringComparison.OrdinalIgnoreCase));
}