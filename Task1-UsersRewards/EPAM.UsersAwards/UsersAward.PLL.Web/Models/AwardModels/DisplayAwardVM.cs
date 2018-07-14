﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UsersAward.Entities;

namespace UsersAward.PLL.Web.Models.AwardModels
{
    public class DisplayAwardVM
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}