using System.Configuration;
using DBDAL;
using Ninject;
using UsersAward.BLL.AbstractBLL;
using UsersAward.BLL.BasicBLL;
using UsersAward.Dal.DBDAL;
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
              .Bind<IAwardLogic>()
              .To<AwardLogic>()
              .InSingletonScope();
            kernel
                .Bind<IUserLogic>()
                .To<UserLogic>()
                .InSingletonScope();
            kernel
                .Bind<IPictureLogic>()
                .To<PictureLogic>()
                .InSingletonScope();
            kernel
                .Bind<IUserDal>()
                .To<UserDao>()
                .InSingletonScope();
            kernel
                .Bind<IAwardDal>()
                .To<AwardDao>()
                .InSingletonScope();
            kernel
                .Bind<IPictureDal>()
                .To<PictureDao>()
                .InSingletonScope();
            kernel
                .Bind<DBDalConfig>()
                .ToSelf()
                .InSingletonScope()
                .WithConstructorArgument("connectionString", ConfigurationManager.ConnectionStrings["UsersAwardsDB"].ConnectionString);
            kernel
                .Bind<ConnectionHelper>()
                .ToSelf()
                .InTransientScope();
        }
    }
}
