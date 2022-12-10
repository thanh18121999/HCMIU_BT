using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using ProjectBE.Models;
using MediatR;
using Project.UseCases.Customer;
namespace ProjectBE.Controllers;
[Route("api/customer")]
public class CustomerController : Controller
{
    private readonly ILogger<CustomerController> _logger;
    private readonly IMediator _mediator;
    public CustomerController(ILogger<CustomerController> logger, IMediator mediator)
    {
        _logger = logger;
        _mediator = mediator;
    }
    [HttpPost("add")]
        public async Task<IActionResult> AddCustomer([FromBody] AddCustomerCommand command, [FromServices] IMediator mediator)
        {
            //var token = HttpContext.Request.Headers["Authorization"].ToString().Split(" ")[1];
            //command.Token = token;
            var result = await mediator.Send(command);
            return StatusCode((int)result.STATUSCODE, result);
        }
    
}