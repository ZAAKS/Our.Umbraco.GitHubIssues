using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Our.Umbraco.GitHubIssues.Application.Interfaces;
using Umbraco.Cms.Web.Common.Authorization;

namespace Our.Umbraco.GitHubIssues.Controllers;

[ApiController]
[Route("umbraco/backoffice/api/github")]
[Authorize(Policy = AuthorizationPolicies.SectionAccessContent)]
public class GitHubIssuesApiController : ControllerBase
{
    private readonly IIssueService _issueService;

    public GitHubIssuesApiController(IIssueService issueService)
    {
        _issueService = issueService;
    }

    [HttpGet("issues")]
    public async Task<IActionResult> GetAllIssues(CancellationToken cancellationToken)
    {
        var issues = await _issueService.GetAllIssuesAsync(cancellationToken);
        return Ok(issues);
    }

    [HttpGet("issues/up-for-grabs")]
    public async Task<IActionResult> GetUpForGrabsIssues(CancellationToken cancellationToken)
    {
        var issues = await _issueService.GetUpForGrabsIssuesAsync(cancellationToken);
        return Ok(issues);
    }

    [HttpGet("issues/{number:int}")]
    public async Task<IActionResult> GetIssue(int number, CancellationToken cancellationToken)
    {
        var issue = await _issueService.GetIssueByNumberAsync(number, cancellationToken);
        
        if (issue == null)
        {
            return NotFound();
        }

        return Ok(issue);
    }
}
