using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UsersAward.BLL.AbstractBLL
{
    public static class ModelRules
    {
        public static int MaxNameLength { get; } = 50;

        public static int MaxDescriptionLength { get; } = 250;

        public static int MaxAge { get; } = 150;

        public static int MinAge { get; } = 1;

        public static int LowerBoundOfId { get; } = 1;

        public static Guid DefaultImageId { get; } = Guid.Empty;
    }
}
