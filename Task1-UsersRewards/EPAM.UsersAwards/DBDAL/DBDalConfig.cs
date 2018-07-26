namespace DBDAL
{
    public class DBDalConfig
    {
        public DBDalConfig(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        public string ConnectionString { get; set; }
    }
}