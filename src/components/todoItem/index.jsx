import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

function TodoItem({ todo, fetchDetailsOfCurrentTodo }) {
  //   console.log(todo);
  return (
    <Card
      sx={{
        maxwidth: "350px",
        display: "flex",
        margin: "10px",
        flexDirection: "column",
        justifyContent: "between",
      }}
    >
      <CardContent>
        <Typography variant="h5" color={"text.primary"}>
          {todo?.todo}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => fetchDetailsOfCurrentTodo(todo?.id)}
          sx={{
            backgroundColor: "black",
            color: "white",
            "&:hover": { backgroundColor: "blue" },
          }}
        >
          DETAILS
        </Button>
      </CardActions>
    </Card>
  );
}

export default TodoItem;
