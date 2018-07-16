using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UsersAward.BLL.AbstractBLL;
using UsersAward.BLL.BasicBLL;

namespace UsersAward.BLL.BllProvider
{
    public static class BllProvider
    {
        public static IAbstractBLL Instance { get; }

        static BllProvider()
        {
            string cfg = ConfigurationManager.AppSettings.Get("Bll").ToLowerInvariant();

            switch (cfg)
            {
                case "basic":
                    //Instance = new BasicBLL.BasicBLL();
                    break;
                default:
                    break;
            }
        }


    }
}
