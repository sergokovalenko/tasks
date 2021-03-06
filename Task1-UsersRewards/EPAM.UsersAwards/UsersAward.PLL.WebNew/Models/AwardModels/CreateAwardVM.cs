﻿using System.ComponentModel.DataAnnotations;
using System.Web;
using System.Web.Mvc;

namespace UsersAward.PLL.Web.Models.AwardModels
{
    public class CreateAwardVM
    {
        [Required]
        [StringLength(50)]
        [RegularExpression(@"[a-zA-Z0-9]([ -]?[0-9a-zA-Z]){0,49}", ErrorMessage = "Only letters, digits, spaces and dashes")]
        [Remote("IsAwardAllowed", "Validation", ErrorMessage = "Award already exist")]
        public string Title { get; set; }

        [StringLength(250)]
        public string Description { get; set; }

        [Required(ErrorMessage = "You should upload image")]
        public HttpPostedFileBase Uploaded { get; set; }
    }
}