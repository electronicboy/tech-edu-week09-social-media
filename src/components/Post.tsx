import {Card, CardActions, CardContent, Typography} from "@mui/material";

export default function Post({username, post, time}: {username: string, post: string, time: Date}) {

    console.log(username, post, time)
    return (
        <Card>

            <CardContent>
                <Typography>
                    {post}
                </Typography>
            </CardContent>
            <CardActions>
                {"today!"}
            </CardActions>
        </Card>
    )
}
