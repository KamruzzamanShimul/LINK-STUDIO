const { execSync } = require('child_process');
const https = require('https');

function getCredentials() {
  const input = "protocol=https\nhost=github.com\n\n";
  const output = execSync('git credential fill', { input, encoding: 'utf8' });
  const lines = output.split('\n');
  let username = '';
  let token = '';
  for (const line of lines) {
    if (line.startsWith('username=')) username = line.replace('username=', '').trim();
    if (line.startsWith('password=')) token = line.replace('password=', '').trim();
  }
  return { username, token };
}

function githubRequest(method, path, body, token) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname: 'api.github.com',
      port: 443,
      path: path,
      method: method,
      headers: {
        'User-Agent': 'Node-Publisher',
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        ...(data ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) } : {})
      }
    }, res => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try {
          const json = raw ? JSON.parse(raw) : {};
          resolve({ status: res.statusCode, data: json });
        } catch (e) {
          resolve({ status: res.statusCode, data: raw });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function main() {
  const { username, token } = getCredentials();
  console.log('Detected user:', username);

  const userRes = await githubRequest('GET', '/user', null, token);
  if (userRes.status !== 200) {
    console.error('Failed to authenticate:', userRes.data);
    return;
  }
  console.log('Authenticated successfully as:', userRes.data.login);

  const repoName = 'LINK-STUDIO';
  console.log(`Checking if repo ${repoName} exists...`);
  let repoRes = await githubRequest('GET', `/repos/${username}/${repoName}`, null, token);
  
  if (repoRes.status === 404) {
    console.log(`Creating public repository ${repoName}...`);
    repoRes = await githubRequest('POST', '/user/repos', {
      name: repoName,
      description: '⚡ SYNDICATE X | Link Studio - High-performance Google Share Link Converter, 50+ Worldwide ccTLD Domain Multiplier & Salt Multiplier Suite',
      private: false,
      has_issues: true,
      has_projects: false,
      has_wiki: false
    }, token);
    if (repoRes.status !== 201) {
      console.error('Failed to create repo:', repoRes.data);
      return;
    }
    console.log('Repository created successfully:', repoRes.data.html_url);
  } else {
    console.log('Repository already exists:', repoRes.data.html_url);
  }

  // Now initialize git locally and push
  console.log('Initializing local git...');
  try {
    execSync('git init', { stdio: 'inherit' });
  } catch (e) {}

  try {
    execSync('git branch -M main', { stdio: 'inherit' });
  } catch (e) {}

  execSync('git add -A', { stdio: 'inherit' });

  try {
    execSync('git commit -m "Initial commit - SYNDICATE X Link Studio"', { stdio: 'inherit' });
  } catch (e) {
    console.log('Commit note:', e.message);
  }

  const remoteUrl = `https://${username}:${token}@github.com/${username}/${repoName}.git`;
  try {
    execSync(`git remote remove origin`, { stdio: 'ignore' });
  } catch (e) {}

  execSync(`git remote add origin ${remoteUrl}`, { stdio: 'inherit' });
  console.log('Pushing to GitHub main branch...');
  execSync('git push -u origin main --force', { stdio: 'inherit' });
  console.log('Successfully pushed to GitHub!');

  // Enable GitHub Pages
  console.log('Enabling GitHub Pages...');
  const pagesRes = await githubRequest('POST', `/repos/${username}/${repoName}/pages`, {
    source: {
      branch: 'main',
      path: '/'
    }
  }, token);

  if (pagesRes.status === 201 || pagesRes.status === 409) {
    console.log(`GitHub Pages active at: https://${username.toLowerCase()}.github.io/${repoName}/`);
  } else {
    console.log('Pages response status:', pagesRes.status, pagesRes.data);
  }

  // Remove credentials from git remote URL for security
  execSync(`git remote set-url origin https://github.com/${username}/${repoName}.git`);
  console.log('Cleaned up remote URL.');
}

main().catch(console.error);
