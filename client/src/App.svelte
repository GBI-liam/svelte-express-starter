<!-- App.svelte -->
<script>
    import { Router, Route } from 'svelte-routing';
    import Home from './pages/home/home.svelte';
    import Page1 from './pages/page1/page1.svelte';
    import "./app.css";
  </script>
  
  <Router>
    <Route path="/" component={Home} />
    <Route path="page1" component={Page1} />
  </Router>
  