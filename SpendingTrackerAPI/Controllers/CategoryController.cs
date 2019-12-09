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

namespace SpendingTrackerAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        private readonly SpendingTrackerDbContext _context;

        public CategoryController(UserManager<User> userManager, IConfiguration configuration, SpendingTrackerDbContext context)
        {
            _userManager = userManager;
            _configuration = configuration;
            _context = context;
        }

        [HttpGet]
        [Route("list/{guid}")]
        public ActionResult<IEnumerable<Category>> GetAllByUserId(string guid)
        {
            return _context.Categories.Where(e => e.UserId == new Guid(guid)).ToList();
        }

        [HttpPost]
        public void Post([FromBody]Category newCategory)
        {
            _context.Categories.Add(newCategory);
        }

        [HttpPost]
        public void Update([FromBody]Category updatedCategory)
        {
            _context.Categories.Update(updatedCategory);
        }
    }
}
