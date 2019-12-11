using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SpendingTrackerAPI.Data;
using SpendingTrackerAPI.Model;

namespace SpendingTrackerAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("Cors")]
    public class BalanceController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        private readonly SpendingTrackerDbContext _context;

        public BalanceController(UserManager<User> userManager, IConfiguration configuration, SpendingTrackerDbContext context)
        {
            _userManager = userManager;
            _configuration = configuration;
            _context = context;
        }

        [HttpGet]
        [Route("get/{guid}")]
        public ActionResult<decimal> Get(string guid)
        {
            return _context.Users.Where(x => x.Id == new Guid(guid)).FirstOrDefault().Balance;
        }

        [HttpPost]
        [Route("{guid}")]
        public void Post(string guid, [FromBody] string spent)
        {
            User toUpdate = _context.Users.Where(x => x.Id == new Guid(guid)).FirstOrDefault();
            toUpdate.Balance = toUpdate.Balance + new Decimal(double.Parse(spent));
            _context.Users.Update(toUpdate);
            _context.SaveChanges();
        }
    }
}