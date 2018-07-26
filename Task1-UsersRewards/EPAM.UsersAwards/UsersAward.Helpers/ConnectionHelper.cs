using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UsersAward.Entities;

namespace UsersAward.Dal.DBDAL
{
    public class ConnectionHelper
    {
        public SqlCommand IntializeCommand(string query, SqlConnection connection, string[] parametrs = null, object[] values = null)
        {
            SqlCommand command = new SqlCommand(query, connection);
            command.CommandType = CommandType.StoredProcedure;
            if (parametrs != null && values != null)
            {
                for (int i = 0; i < parametrs.Length; i++)
                {
                    command.Parameters.Add(new SqlParameter(parametrs[i], values[i])
                    {
                        Direction = ParameterDirection.Input
                    });
                }
            }

            return command;
        }

        public UserDTO ReadUser(SqlDataReader reader)
        {
            return new UserDTO()
            {
                Id = (int)reader["Id"],
                Name = (string)reader["Name"],
                BirthDate = (DateTime)reader["Birthdate"],
                ImageId = (Guid)reader["ImageId"]
            };
        }

        public AwardDTO ReadAward(SqlDataReader reader)
        {
            string description = reader["Description"] == DBNull.Value ? "" : (string)reader["Description"];

            return new AwardDTO()
            {
                Id = (int)reader["Id"],
                Title = (string)reader["Title"],
                Description = description,
                ImageId = (Guid)reader["ImageId"],
            };
        }

        public ImageDTO ReadImage(SqlDataReader reader)
        {
            return new ImageDTO()
            {
                OwnerId = (Guid)reader["OwnerId"],
                Data = (byte[])reader["Bytes"],
                Type = (string)reader["Type"]
            };
        }
    }
}
