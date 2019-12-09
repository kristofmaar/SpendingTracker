using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SpendingTrackerAPI.Model
{
    public class Spending
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        [Required]
        public Currency Currency { get; set; }

        public string Description { get; set; }

        [Required]
        public DateTime DateCreated { get; set; }

        [Required]
        public Category Category { get; set; }

        [Required]
        public Guid UserId { get; set; }
    }
}
