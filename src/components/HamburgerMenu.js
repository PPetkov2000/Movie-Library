import { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'
import SearchForm from './SearchForm'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}))

const HamburgerMenu = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.container}>
      <IconButton color="inherit" aria-label="Open Left Sidebar" edge="start" onClick={handleDrawerOpen}>
        <MenuIcon />
      </IconButton>
      <Drawer
        className={classes.drawer}
        variant="temporary"
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <SearchForm />
        <List>
          {['Menu Item 1', 'Menu Item 2', 'Menu Item 3'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  )
}

export default HamburgerMenu
