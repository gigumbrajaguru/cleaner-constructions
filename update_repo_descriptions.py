#!/usr/bin/env python3
"""
GitHub Repository Description Updater

Updates repository descriptions for multiple repositories.
Requires GITHUB_TOKEN environment variable to be set.

Usage:
    export GITHUB_TOKEN="your_token"
    python update_repo_descriptions.py
"""

import os
import requests
import json
from typing import Dict, List, Tuple

# Repository descriptions to update
REPO_DESCRIPTIONS = {
    "gigumbrajaguru/cleaner-constructions": "React + TypeScript UI component library with Radix UI, Material-UI, and Supabase integration using Vite",
    "gigumbrajaguru/Discord-BOT": "Python Discord bot with modular cogs and functions for server management",
    "gigumbrajaguru/Financial-Sheets": "Jupyter notebooks for financial data analysis and economic management",
    "gigumbrajaguru/Item-Assignment": "Full-stack project with Angular frontend and Python Flask backend, containerized with Docker",
    "gigumbrajaguru/SLIIT-Code-Notes": "University coursework collection including C#, Java, PHP, and various computer science projects",
    "gigumbrajaguru/Started": "Unreal Engine 5 C# game project template",
    "gigumbrajaguru/TwitterBOT": "Python bot for retrieving, filtering, and processing Twitter data",
    "GBRSystem/.github-private": "GBRSystem organization private configuration and profile setup",
}

class GitHubRepoUpdater:
    """Updates repository descriptions via GitHub API"""
    
    def __init__(self, token: str):
        """Initialize with GitHub token"""
        self.token = token
        self.headers = {
            "Authorization": f"token {token}",
            "Accept": "application/vnd.github.v3+json",
            "User-Agent": "Repository-Description-Updater"
        }
        self.base_url = "https://api.github.com/repos"
    
    def update_description(self, repo: str, description: str) -> Tuple[bool, str]:
        """
        Update repository description
        
        Args:
            repo: Repository in format "owner/name"
            description: New description
            
        Returns:
            Tuple of (success: bool, message: str)
        """
        url = f"{self.base_url}/{repo}"
        payload = {"description": description}
        
        try:
            response = requests.patch(url, headers=self.headers, json=payload)
            
            if response.status_code == 200:
                return True, f"✓ {repo} updated successfully"
            else:
                error_msg = response.json().get("message", response.text)
                return False, f"✗ {repo} failed: {error_msg}"
        except Exception as e:
            return False, f"✗ {repo} error: {str(e)}"
    
    def update_all(self) -> Dict[str, List[str]]:
        """Update all repository descriptions"""
        results = {"success": [], "failed": []}
        
        print("🔄 Starting repository description updates...\n")
        
        for repo, description in REPO_DESCRIPTIONS.items():
            success, message = self.update_description(repo, description)
            
            if success:
                results["success"].append(message)
                print(f"✅ {message}")
            else:
                results["failed"].append(message)
                print(f"❌ {message}")
        
        return results
    
    def print_summary(self, results: Dict[str, List[str]]):
        """Print summary of updates"""
        print("\n" + "="*60)
        print("📊 UPDATE SUMMARY")
        print("="*60)
        print(f"✅ Successful: {len(results['success'])}")
        print(f"❌ Failed: {len(results['failed'])}")
        print("="*60)
        
        if results["failed"]:
            print("\n⚠️  Failed updates:")
            for msg in results["failed"]:
                print(f"  {msg}")
        else:
            print("\n🎉 All repositories updated successfully!")


def main():
    """Main entry point"""
    token = os.getenv("GITHUB_TOKEN")
    
    if not token:
        print("❌ Error: GITHUB_TOKEN environment variable not set")
        print("\nTo set it, run:")
        print("  export GITHUB_TOKEN='your_personal_access_token'")
        print("\nGet a token from: https://github.com/settings/tokens")
        return 1
    
    updater = GitHubRepoUpdater(token)
    results = updater.update_all()
    updater.print_summary(results)
    
    return 0 if not results["failed"] else 1


if __name__ == "__main__":
    exit(main())
