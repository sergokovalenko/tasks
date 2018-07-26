using System;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace UsersAward.PLL.Web.Models.AwardModels
{
    public class EditAwardVM
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        [RegularExpression(@"[a-zA-Z0-9]([ -]?[0-9a-zA-Z]){0,49}", ErrorMessage = "Only letters, digits, spaces and -")]
        [Remote("IsAwardAllowed", "Validation")]
        public string Title { get; set; }

        [StringLength(250)]
        public string Description { get; set; }

        public Guid ImageId { get; set; }
    }
}