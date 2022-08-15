// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {json_data} from '../../../Data'


let newPlan = {
  id: null,
  img: null,
  name: null,
  workouts: [],
};

export default function handler(req, res) {

  if (req.method === "POST") {
    let name = req.body.input.name;
    let img = req.body.input.img;
    newPlan.id = json_data.plans.length;
    newPlan.name = name;
    newPlan.img = img;

    json_data.plans.push(newPlan);
    res.status(200).json(json_data.plans);
  }
  if (req.method === "GET") {
    if (req.query.workoutId) {
      let selectedPlanId = req.query.id;
      let selectedWorkoutId = req.query.workoutId;

      let plan = json_data.plans.filter((plan) => plan.id === selectedPlanId);
      let workout = plan[0].workouts.filter((workout) => workout.id === selectedWorkoutId);
      res.status(200).json(workout[0]);
    }

    if (req.query.id) {
      let selectedPlanId = parseInt(req.query.id);
      let plan = json_data.plans.filter((plan) => plan.id === selectedPlanId);
      res.status(200).json(plan[0]);
    } else {
      res.status(200).json(json_data.plans);
    }
  }
}
