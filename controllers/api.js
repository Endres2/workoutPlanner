const router = require("express").Router();
const Workout = require("../models/workout.js");

router.post("/api/workouts", ({body}, res) =>{
    const myWorkout = new Workout(body);
    
    Workout.create(myWorkout)
    .then(workout =>{
        res.json(workout)
    })
    .catch(err=>{
        res.json(err)
    });
});

router.put("/api/workouts/:id", ({body, params}, res) =>{
    // const myWorkout = new Workout(body);
    
    Workout.findByIdAndUpdate(params.id, {...body})
    .then(workout =>{
        res.json(workout)
    })
    .catch(err=>{
        res.json(err)
    });

});

router.get('/api/workouts', (req, res) => {
    Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: '$exercises.duration',
          },
        },
      },
    ])
      .then((dbWorkouts) => {
        res.json(dbWorkouts);
      })
      .catch((err) => {
        res.json(err);
      });
  });

router.get('/api/workouts/range', (req, res) => {
    Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: '$exercises.duration',
          },
        },
      },
    ])
      .sort({ _id: -1 })
      .limit(7)
      .then((dbWorkouts) => {
        console.log(dbWorkouts);
        res.json(dbWorkouts);
      })
      .catch((err) => {
        res.json(err);
      });
  });
module.exports = router;