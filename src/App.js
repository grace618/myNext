import React, { Suspense, lazy } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import Layout from 'views/Layouts'
const Home = lazy(() => import('views/Home'))
const GameDetail = lazy(() => import('views/GameDetail'))
const GameList = lazy(() => import('views/GameList'))
const Publishing = lazy(() => import('views/Publishing'))
const Jobs = lazy(() => import('views/Jobs'))
function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Suspense fallback={<div></div>}>
                    <Switch>
                        <Route path="/jobs" component={Jobs} exact></Route>
                        <Layout>
                            <Route path="/" exact component={Home}></Route>
                            <Route path="/detail/:id" component={GameDetail}></Route>
                            <Route path="/gameslist" component={GameList}></Route>
                            <Route path="/publishing" component={Publishing}></Route>
                        </Layout>
                    </Switch>
                </Suspense>
            </Router>
        </ThemeProvider>
    )
}
export default App