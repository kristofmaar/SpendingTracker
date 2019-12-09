using SpendingTrackerAPI.Model;
using System.ComponentModel.DataAnnotations;

namespace SpendingTrackerAPI.ViewModels
{
    public class RegisterViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Currency { get; set; }
    }

}
