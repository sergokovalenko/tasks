using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using UsersAward.Entities;
using UsersAward.PLL.Web.Models;
using UsersAward.PLL.Web.Models.UserModels;

namespace UsersAward.PLL.Web.Controllers
{
    public class ApiUsersController : ApiController
    {
        private UserPictureBllModel bllModel;

        public ApiUsersController(UserPictureBllModel model)
        {
            this.bllModel = model;
        }

        [Route("api/users/")]
        [Route("api/users/{query}")]
        [HttpGet]
        public IHttpActionResult Get(string query = "")
        {
            var model = bllModel.GetModelForHomePage(query);

            if (model == null)
            {
                return NotFound();
            }

            return Json(model);
        }

        [Route("api/user/{id}")]
        [HttpGet]
        public IHttpActionResult GetUser(string id)
        {
            var userModel = bllModel.GetDetailedUser(id);

            if (userModel == null)
            {
                return NotFound();
            }

            return Json(userModel);
        }

        [Route("api/user/{id}/delete")]
        [HttpDelete]
        public IHttpActionResult DeleteUser(int id)
        {
            if (bllModel.DeleteUser(id))
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        [Route("api/user/{id}/edit")]
        [HttpPut]
        public IHttpActionResult EditUser(int id, [FromBody]EditUserVM updatedUser)
        {
            var user = bllModel.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }

            if (!string.IsNullOrWhiteSpace(updatedUser.Name))
            {
                user.Name = updatedUser.Name;
            }
            if (updatedUser.BirthDate != new DateTime())
            {
                user.BirthDate = updatedUser.BirthDate;
            }

            if (bllModel.UpdateUser(user))
            {
                return Ok();

            }

            return BadRequest("We can't update user with this parametrs");
        }

        [Route("api/create-user")]
        [HttpPost]
        public IHttpActionResult CreateUser([FromBody]CreateUserVM user)
        {
            if (ModelState.IsValid)
            {
                int id = bllModel.AddUser(Mapper.Map<UserDTO>(user));

                if (id > 0)
                {
                    return Created($"api/user/{id}", bllModel.GetUserById(id));
                }
                else
                {
                    return BadRequest("We can't create user with this parametrs");
                }
            }

            return BadRequest("Name and BirthDate is required");
        }

        [Route("api/award-user/{userId_awardId}")]
        [HttpPost]
        public IHttpActionResult Reward(string userId_awardId)
        {
            var answer = bllModel.AwardUserByUrl(userId_awardId);

            if (!answer)
            {
                return NotFound();
            }

            return Ok();
        }
    }
}
