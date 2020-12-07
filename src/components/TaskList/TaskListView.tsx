import { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Checkbox from '@material-ui/core/Checkbox';
import CardContent from '@material-ui/core/CardContent';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SortIcon from '@material-ui/icons/Sort';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import RemoveIcon from '@material-ui/icons/Remove';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Typography from '@material-ui/core/Typography';

interface Props {
  tasks: Task[];
  newTask: string;
  sortKeys: SortKey[];
  selectedSortKey: SortKey;
  sortDirection: SortDirection;
  handleTaskInput: HandleTaskInput;
  handleTaskAddition: HandleTaskAddition;
  handleTaskCompletion: HandleTaskCompletion;
  handleTaskDeletion: HandleTaskDeletion;
  handleTaskPrioritisation: HandleTaskPrioritisation;
  handleTaskSort: HandleTaskSort;
  handleSortDirectionToggle: HandleSortDirectionToggle;
  completedTaskCount: CompletedTaskCount;
  currentDate: CurrentDateDisplay;
}

interface TaskProps {
  task: Task;
  handleTaskCompletion: HandleTaskCompletion;
  handleTaskDeletion: HandleTaskDeletion;
  handleTaskPrioritisation: HandleTaskPrioritisation;
}

const renderPriorityIcon = (priority: number) => () => {
  const iconMap: PriorityIconMap = {
    '1': <ArrowDownwardIcon color='secondary' />,
    '2': <RemoveIcon color='primary' />,
    '3': <ArrowUpwardIcon color='error' />,
  };
  return <Box paddingRight={2}>{iconMap[priority.toString()]}</Box>;
};

const Task: FC<TaskProps> = ({ task, handleTaskCompletion, handleTaskDeletion, handleTaskPrioritisation }) => (
  <Box display='flex' flexDirection='row' alignItems='center' padding={0.5}>
    <Box>
      <Checkbox checked={task.isComplete} onChange={handleTaskCompletion(task)} />
    </Box>
    <Box>
      <Typography variant='h5' style={{ textDecoration: task.isComplete ? 'line-through' : 'none' }}>
        {task.description}
      </Typography>
    </Box>
    <Box display='flex' alignItems='center' marginLeft='auto'>
      <Box>
        <IconButton aria-label='delete' onClick={handleTaskDeletion(task)}>
          <DeleteForeverIcon fontSize='small' />
        </IconButton>
      </Box>
      <Box>
        <Select
          native
          value={task.priority}
          onChange={handleTaskPrioritisation(task)}
          IconComponent={renderPriorityIcon(task.priority)}>
          <option value={1}>Low</option>
          <option value={2}>Medium</option>
          <option value={3}>High</option>
        </Select>
      </Box>
    </Box>
  </Box>
);

const useStyles = makeStyles({
  root: {
    minWidth: 500,
  },
  upsideDown: {
    transform: 'rotate(180deg)',
  },
});

const TaskListView: FC<Props> = ({
  tasks,
  newTask,
  sortKeys,
  selectedSortKey,
  sortDirection,
  handleTaskInput,
  handleTaskAddition,
  handleTaskCompletion,
  handleTaskDeletion,
  handleTaskPrioritisation,
  handleTaskSort,
  handleSortDirectionToggle,
  completedTaskCount,
  currentDate,
}) => {
  const classes = useStyles();

  return (
    <Grid>
      <Box display='flex' justifyContent='center' marginTop='50px'>
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardActionArea>
              <CardContent>
                <Box display='flex' flexDirection='column' alignItems='center'>
                  <Typography gutterBottom variant='h5' component='h2'>
                    {currentDate.day}
                  </Typography>
                  <Typography variant='body2' color='textSecondary' component='p'>
                    {`${currentDate.month} ${currentDate.date}, ${currentDate.year}`}
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
            <CardContent>
              <Box display='flex'>
                <Box>
                  <Typography variant='caption' color='secondary'>
                    {tasks.length} {`task${tasks.length !== 1 ? 's' : ''}`}
                  </Typography>
                </Box>
                <Box marginLeft={1}>
                  <Typography variant='caption' color='secondary'>
                    {completedTaskCount} completed
                  </Typography>
                </Box>
                <Box display='flex' alignItems='center' marginLeft='auto'>
                  <Box>
                    <Select native value={selectedSortKey} onChange={handleTaskSort}>
                      {sortKeys.map((sortKey) => (
                        <option key={sortKey} value={sortKey}>
                          {sortKey}
                        </option>
                      ))}
                    </Select>
                  </Box>
                  <Box>
                    <IconButton onClick={handleSortDirectionToggle(sortDirection)}>
                      <SortIcon className={`${sortDirection === 'ascending' ? classes.upsideDown : ''}`} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
              <form onSubmit={handleTaskAddition}>
                <Input
                  placeholder='Add a task...'
                  onChange={handleTaskInput}
                  value={newTask}
                  fullWidth
                  startAdornment={
                    <InputAdornment position='start'>
                      <FormatListBulletedIcon />
                    </InputAdornment>
                  }
                />
              </form>
            </CardContent>
            <CardContent>
              {tasks.map((task) => (
                <Task
                  key={task.description}
                  {...{
                    task,
                    handleTaskCompletion,
                    handleTaskDeletion,
                    handleTaskPrioritisation,
                  }}
                />
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </Grid>
  );
};

export default TaskListView;
