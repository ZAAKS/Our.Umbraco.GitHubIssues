namespace Our.Umbraco.GitHubIssues.Domain.Entities;

public class Label
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}
