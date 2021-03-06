﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using UsersAward.Entities;

namespace UsersAward.PLL.Web.Models.UserModels
{
    public class DisplayUserVM
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int Age { get; set; }

        [Display(Name = "Birthday")]
        [DisplayFormat(DataFormatString = "{0:d}")]
        public DateTime BirthDate { get; set; }

        public List<AwardDTO> Awards { get; set; }

        public Guid ImageId { get; set; }
    }
}