using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace save_the_pony.Controllers
{
    [Route("api/[controller]")]
    public class MazeController : Controller
    {
        private string Maze_Id = "a561f55c-e2a7-4e80-a829-35f8ac7517a6";
        // old a561f55c-e2a7-4e80-a829-35f8ac7517a6
        // 0c3e8fda-426c-43dd-9261-e539f6e748ae

        [HttpGet("[action]")]
        public IActionResult status()
        {
            using (var client = new HttpClient())
            {
                try
                {
                    client.BaseAddress = new Uri("https://ponychallenge.trustpilot.com/pony-challenge/maze/");
                    var response = client.GetAsync($"{Maze_Id}").Result;                    

                    var stringResult = response.Content.ReadAsStringAsync().Result.Replace("-","_");

                    return Ok(stringResult);
                } catch (HttpRequestException httpRequestException) {
                    return BadRequest($"Error getting data from ponychallenge: {httpRequestException.Message}");
                }
            }
        }
        
        [HttpGet("[action]/{direction}")]
        public IActionResult movement(string direction)
        {
            var jsonPost = new MoveData();
            jsonPost.direction = direction;

            using (var client = new HttpClient())
            {
                try
                {
                    client.BaseAddress = new Uri("https://ponychallenge.trustpilot.com/pony-challenge/maze/");
                    var movement = JsonConvert.SerializeObject(jsonPost);
                    var response = client.PostAsync(
                        $"{Maze_Id}",
                        new StringContent(
                            movement,
                            System.Text.Encoding.UTF8,
                            "application/json")
                        ).Result;

                    var stringResult = response.Content.ReadAsStringAsync().Result.Replace("-","_");

                    return Ok(stringResult);
                } catch (HttpRequestException httpRequestException) {
                    return BadRequest($"Error getting movement from ponychallenge: {httpRequestException}");
                }
            }
        }

        private class MoveData {
            public string direction;
        }
    }
}
