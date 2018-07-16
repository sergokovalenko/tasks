using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ninject;
using UsersAward.BLL.AbstractBLL;
using UsersAward.DAL.AbstractDAL;

namespace UsersAward.NinjectConfig
{
    public static class Config
    {
        /// <summary>
        /// Load your modules or register your services here!
        /// </summary>
        /// <param name="kernel">The kernel.</param>
        public static void RegisterServices(IKernel kernel)
        {
            kernel
                .Bind<IAbstractDAL>()
                .To<DAL.DBDAL.DBDAL>();

            kernel
                .Bind<IAbstractBLL>()
                .To<BLL.BasicBLL.BasicBLL>()
                .InSingletonScope();

            //kernel
            //    .Bind<BllModel>()
            //    .ToSelf()
            //    .InSingletonScope();
        }
    }
}
