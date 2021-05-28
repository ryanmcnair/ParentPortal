﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ParentPortal.DataAccess;
using ParentPortal.Models;

namespace ParentPortal.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        UserRepository _repo;

        public UsersController()
        {
            _repo = new UserRepository();
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            return Ok(_repo.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = _repo.Get(id);
            if (user == null)
            {
                return NotFound("This user id does not exist");
            }
            return Ok(user);
        }

        [HttpGet("fb/{fb_uid}")]
        public IActionResult GetUserByFBUid(string fb_uid)
        {
            var user = _repo.GetByFBUid(fb_uid);
            if (user == null)
            {
                return NotFound("This user id does not exist");
            }
            return Ok(user);
        }

        [HttpPost]
        public IActionResult AddAUser(User user)
        {
            _repo.Add(user);
            return Created($"api/users/{user.id}", user);
        }

        [HttpDelete("{userId}")]
        public IActionResult DeleteUser(int userId)
        {
            _repo.Remove(userId);
            return Ok();
        }

        [HttpPut("{id}/update")]
        public IActionResult UpdateUser(int id, User userObj)
        {
            var user = _repo.Get(id);

            user.classroom_id = userObj.classroom_id;
            user.name = userObj.name;
            user.is_teacher = userObj.is_teacher;
            user.is_parent = userObj.is_parent;
            user.is_admin = userObj.is_admin;
            user.student_id = userObj.student_id;

            _repo.Update(user);
            return NoContent();
        }
    }
}
