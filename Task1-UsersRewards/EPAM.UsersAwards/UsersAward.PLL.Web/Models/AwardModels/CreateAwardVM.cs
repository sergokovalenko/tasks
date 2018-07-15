using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace UsersAward.PLL.Web.Models.AwardModels
{
    public class CreateAwardVM
    {
        [Required]
        [MaxLength(50)]
        [RegularExpression("[a-zA-Z0-9]([ -]?[0-9a-zA-Z]){0,249}")]
        public string Title { get; set; }
        [MaxLength(250)]
        public string Description { get; set; }
    }
}