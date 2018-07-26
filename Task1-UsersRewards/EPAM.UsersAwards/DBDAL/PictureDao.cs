using DBDAL;
using System;
using System.Data.SqlClient;
using UsersAward.DAL.AbstractDAL;
using UsersAward.Entities;

namespace UsersAward.Dal.DBDAL
{
    public class PictureDao : IPictureDal
    {
        private DBDalConfig config;
        private ConnectionHelper helper;

        public PictureDao(DBDalConfig config, ConnectionHelper con)
        {
            this.config = config;
            this.helper = con;
        }

        public bool AddImage(ImageDTO img)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = helper.IntializeCommand(
                    "[dbo].[Image.AddImage]",
                    connection,
                    new string[] { "@OwnerId", "@Bytes", "@DataType" },
                    new object[] { img.OwnerId, img.Data, img.Type }
                    );

                connection.Open();
                int countRow = command.ExecuteNonQuery();

                return countRow > 0;
            }
        }

        public ImageDTO GetImageById(Guid id)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = helper.IntializeCommand(
                    "[dbo].[Image.GetById]",
                    connection,
                    new string[] { "@Id" },
                    new object[] { id }
                    );

                connection.Open();
                var reader = command.ExecuteReader();

                if (reader.Read())
                {
                    return helper.ReadImage(reader);
                }

                return null;
            }
        }

        public bool UpdateImage(ImageDTO img)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = helper.IntializeCommand(
                    "[dbo].[Image.UpdateImage]",
                    connection,
                    new string[] { "@OwnerId", "@Data", "@DataType" },
                    new object[] { img.OwnerId, img.Data, img.Type }
                    );
                connection.Open();

                int countRow = command.ExecuteNonQuery();

                return countRow > 0;
            }
        }

        public bool DeleteImage(Guid OwnerId)
        {
            using (SqlConnection connection = new SqlConnection(config.ConnectionString))
            {
                SqlCommand command = helper.IntializeCommand(
                    "[dbo].[Image.Deleteimage]",
                    connection,
                    new string[] { "@OwnerId" },
                    new object[] { OwnerId }
                    );
                connection.Open();
                int countRow = command.ExecuteNonQuery();

                return countRow > 0;
            }
        }
    }
}
