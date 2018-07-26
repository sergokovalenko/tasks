using log4net;
using log4net.Config;

namespace UsersAward.PLL.Web.App_Start
{
    public static class Logger
    {
        static Logger()
        {
            BasicConfigurator.Configure();
            Log = LogManager.GetLogger("base");
        }

        public static ILog Log { get; }

    }
}