using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ParentPortal.DataAccess;
using ParentPortal.Models;

namespace ParentPortal.Controllers
{
    [Route("api/assignments")]
    [ApiController]
    public class AssignmentsController : ControllerBase
    {
        AssignmentRepository _repo;

        public AssignmentsController()
        {
            _repo = new AssignmentRepository();
        }

        [HttpGet]
        public IActionResult GetAllAssignments()
        {
            return Ok(_repo.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var assignment = _repo.Get(id);
            if (assignment == null)
            {
                return NotFound("This user id does not exist");
            }
            return Ok(assignment);
        }

        [HttpGet("classroom/{id}")]
        public IActionResult GetAssignmentByClassroom(int id)
        {
            var assignment = _repo.GetAssignmentByClassroom(id);
            if (assignment == null)
            {
                return NotFound("This user id does not exist");
            }
            return Ok(assignment);
        }

        [HttpPost]
        public IActionResult AddAssignment(Assignment assignment)
        {
            _repo.Add(assignment);
            return Created($"api/assignments/{assignment.id}", assignment);
        }

        [HttpDelete("{assignmentid}")]
        public IActionResult DeleteMessage(int assignmentid)
        {
            _repo.Remove(assignmentid);
            return Ok();
        }

        [HttpPatch("{id}/update")]
        public IActionResult UpdateUser(int id, Assignment assignmentObj)
        {
            var assignment = _repo.Get(id);

            assignment.pdf_url = assignmentObj.pdf_url;
            assignment.date_due = assignmentObj.date_due;
            assignment.text = assignmentObj.text;

            _repo.Update(assignment);
            return NoContent();
        }
    }
}
