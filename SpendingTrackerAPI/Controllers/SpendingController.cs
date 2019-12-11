using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SpendingTrackerAPI.Data;
using SpendingTrackerAPI.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SpendingTrackerAPI
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("Cors")]
    public class SpendingController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        private readonly SpendingTrackerDbContext _context;

        public SpendingController(UserManager<User> userManager, IConfiguration configuration, SpendingTrackerDbContext context)
        {
            _userManager = userManager;
            _configuration = configuration;
            _context = context;
        }

        [HttpGet]
        [Route("list/{guid}")]
        public ActionResult<IEnumerable<Spending>> GetAllByUserId(string guid)
        {
            return _context.Spendings.Where(e => e.UserId == new Guid(guid)).ToList();
        }

        [HttpPost]
        [Route("add")]
        public void Post([FromBody]Spending newSpending)
        {
            _context.Spendings.Add(newSpending);
            User toUpdate = _context.Users.Where(x => x.Id == newSpending.UserId).FirstOrDefault();
            toUpdate.Balance = toUpdate.Balance - newSpending.Amount;
            _context.Users.Update(toUpdate);
            _context.SaveChanges();
        }

        [HttpPost]
        public void Update([FromBody]Spending updatedSpending)
        {
            _context.Spendings.Update(updatedSpending);
            _context.SaveChanges();
        }
    }
}
