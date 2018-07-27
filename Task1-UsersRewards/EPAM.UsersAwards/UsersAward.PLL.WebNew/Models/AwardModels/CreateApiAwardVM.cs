using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace UsersAward.PLL.Web.Models.AwardModels
{
    public class CreateApiAwardVM
    {
        [Required]
        [StringLength(50)]
        [RegularExpression(@"[a-zA-Z0-9]([ -]?[0-9a-zA-Z]){0,49}")]
        [Remote("IsAwardAllowed", "Validation")]
        public string Title { get; set; }

        [StringLength(250)]
        public string Description { get; set; }
    }
}