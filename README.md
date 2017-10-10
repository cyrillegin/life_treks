# life_treks\

###Pipeline
branch Master is live, always in production mode

branch staging is live. This will have the long ...aws... url. This is to be used to test everything.

branch dev is local only.

Once a new set of features is ready to be deployed, dev can be merged with staging. Everything should be throughly tested
TODO: implement automatic testing on local and remote deployments.
If anything errors occur, create hot-fix branch from staging, make the changes, merge them, and redeploy to staging only.

Once everything has been tested and is working, staging can be merged with master.
    If any hot-fixes occurred, make sure to remerge master back into dev.

Once a new production has been deployed, delete all hot-fix and feature branches and move to next task.
