# TruthCapture

Advanced web capture engine with ML-powered intelligence and multi-node consensus.

## 🚀 Overview

TruthCapture is a distributed web content verification system that creates cryptographically-verifiable, court-admissible evidence of digital content using Byzantine fault-tolerant consensus across multiple nodes.

## 📁 Project Structure

- `web/` - React frontend application
- `orchestrator/` - Rust service that coordinates captures
- `worker/` - TypeScript workers that perform captures
- `ml/` - Python ML engine for intelligent decisions
- `shared/` - Shared types and schemas

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Firebase Auth
- **Orchestrator**: Rust, Axum, Tokio
- **Workers**: Node.js, TypeScript, Playwright
- **ML Engine**: Python, FastAPI, PyTorch

## 🏃 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/truthcapture.git
cd truthcapture

# Install all dependencies
make install

# Start all services (each in separate terminal)
make dev-web
make dev-orchestrator
make dev-worker
make dev-ml