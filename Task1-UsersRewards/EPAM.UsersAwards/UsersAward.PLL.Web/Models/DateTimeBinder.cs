﻿using System;
using System.Globalization;
using System.Web.Mvc;

namespace UsersAward.PLL.Web.Models
{
    public class DateTimeBinder : IModelBinder
    {
        private static CultureInfo culture;

        static DateTimeBinder()
        {
            culture = CultureInfo.GetCultureInfo("en-US");
        }

        public object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
        {
            var value = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);
            var date = value.ConvertTo(typeof(DateTime), culture);

            return date;
        }
    }
}