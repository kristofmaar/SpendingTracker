using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpendingTrackerAPI.Models
{
    public class User : IdentityUser<Guid>
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public override Guid Id { get; set; }

        [MaxLength(50)]
        [Required]
        public string Name { get; set; }

        [Required]
        public decimal Balance { get; set; }

        [Required]
        public Currency Currency { get; set; }

        ICollection<Category> Categories { get; set; }

        ICollection<Spending> Spendings { get; set; }
    }
}
