using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DBDAL
{
    public class DBDalConfig
    {
        public string ConnectionString { get; set; }

        public DBDalConfig(string connectionString)
        {
            this.ConnectionString = connectionString;
        }
    }
}
