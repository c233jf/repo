# Install dependencies for the project

# Update package list
sudo apt-get update

# Install required packages
sudo apt-get install -y curl git

# Install pnpm
curl -fsSL https://get.pnpm.io/install.sh | sh -

# Install Go (https://go.dev/doc/install)
curl -fsSL -O https://go.dev/dl/go1.24.3.linux-arm64.tar.gz
sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go1.24.3.linux-arm64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> /home/vagrant/.bashrc
echo "source /home/vagrant/.bashrc" >> /home/vagrant/.bash_profile

# Install uv (https://github.com/astral-sh/uv)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Install cpplint (https://github.com/cpplint/cpplint)
sudo apt-get install -y pipx
pipx ensurepath
pipx install cpplint

# Install clang-format (https://clang.llvm.org/docs/ClangFormat.html)
sudo apt-get install -y clang-format

# Clone the repository if it doesn't exist
if [ ! -d "/home/vagrant/repo/.git" ]; then
  cd /home/vagrant
  rm -rf repo
  git clone https://github.com/c233jf/repo.git
fi