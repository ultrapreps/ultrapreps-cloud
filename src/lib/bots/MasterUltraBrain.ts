'use client';

import { autonomousUltraBrain } from './AutonomousUltraBrain';
import { designMaster } from './DesignMaster';
import { profileBot } from './ProfileBot';
import { schoolUniverse } from './SchoolUniverse';
import { ultraGuardian } from './UltraGuardian';

export interface BrainTaskData {
  [key: string]: unknown;
}

export interface BrainTask {
  id: string;
  type: 'profile_creation' | 'design_generation' | 'safety_check' | 'school_setup' | 'content_fix';
  priority: 'low' | 'medium' | 'high' | 'critical';
  data: BrainTaskData;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  assignedBot?: string;
  result?: unknown;
  error?: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface BrainInsight {
  type: 'recommendation' | 'warning' | 'success' | 'trend';
  message: string;
  data?: unknown;
  actionRequired: boolean;
}

class MasterUltraBrain {
  private taskQueue: BrainTask[] = [];
  private processingTasks = new Map<string, BrainTask>();
  private insights: BrainInsight[] = [];
  private isActive = false;
  private processInterval: NodeJS.Timeout | null = null;

  async initialize() {
    this.isActive = true;
    
    // Activate autonomous systems
    await autonomousUltraBrain.activate();
    
    // Start task processing
    this.processInterval = setInterval(() => {
      this.processTasks();
    }, 5000); // Process every 5 seconds
    
    // Generate initial insights
    this.generateSystemInsights();
  }

  shutdown() {
    this.isActive = false;
    autonomousUltraBrain.deactivate();
    
    if (this.processInterval) {
      clearInterval(this.processInterval);
      this.processInterval = null;
    }
  }

  async createTask(
    type: BrainTask['type'], 
    data: BrainTaskData, 
    priority: BrainTask['priority'] = 'medium'
  ): Promise<string> {
    const task: BrainTask = {
      id: Date.now().toString(),
      type,
      priority,
      data,
      status: 'pending',
      createdAt: new Date()
    };
    
    this.taskQueue.push(task);
    this.sortTaskQueue();
    
    // Process immediately if critical
    if (priority === 'critical') {
      await this.processTask(task);
    }
    
    return task.id;
  }

  private sortTaskQueue() {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    this.taskQueue.sort((a, b) => 
      priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  }

  private async processTasks() {
    if (!this.isActive) return;
    
    // Get next pending task
    const task = this.taskQueue.find(t => t.status === 'pending');
    if (!task) return;
    
    await this.processTask(task);
  }

  private async processTask(task: BrainTask) {
    task.status = 'processing';
    this.processingTasks.set(task.id, task);
    
    try {
      switch (task.type) {
        case 'profile_creation':
          task.result = await this.handleProfileCreation(task.data);
          task.assignedBot = 'ProfileBot';
          break;
          
        case 'design_generation':
          task.result = await this.handleDesignGeneration(task.data);
          task.assignedBot = 'DesignMaster';
          break;
          
        case 'safety_check':
          task.result = await this.handleSafetyCheck(task.data);
          task.assignedBot = 'UltraGuardian';
          break;
          
        case 'school_setup':
          task.result = await this.handleSchoolSetup(task.data);
          task.assignedBot = 'SchoolUniverse';
          break;
          
        case 'content_fix':
          task.result = await this.handleContentFix(task.data);
          task.assignedBot = 'AutonomousUltraBrain';
          break;
      }
      
      task.status = 'completed';
      task.completedAt = new Date();
      
      // Generate insight based on result
      this.analyzeTaskResult(task);
      
    } catch (error) {
      task.status = 'failed';
      task.error = error instanceof Error ? error.message : 'Unknown error';
      
      this.insights.push({
        type: 'warning',
        message: `Task ${task.id} failed: ${task.error}`,
        actionRequired: true
      });
    } finally {
      this.processingTasks.delete(task.id);
      // Remove from queue if completed or failed
      this.taskQueue = this.taskQueue.filter(t => t.id !== task.id);
    }
  }

  private async handleProfileCreation(data: BrainTaskData) {
    // Create athlete identity
    const identity = await profileBot.buildIdentity(data as Parameters<typeof profileBot.buildIdentity>[0]);
    
    // Generate visual assets
    const heroCard = await designMaster.generateDesign({
      type: 'herocard',
      context: {
        athleteName: identity.name,
        school: identity.school,
        sport: identity.sport
      }
    });
    
    // Safety check the generated content
    const safetyCheck = await ultraGuardian.moderateContent(identity.bio);
    
    return {
      identity,
      heroCard,
      safetyCheck
    };
  }

  private async handleDesignGeneration(data: BrainTaskData) {
    const { request } = data as { request: Parameters<typeof designMaster.generateDesign>[0] };
    const design = await designMaster.generateDesign(request);
    
    // Check image safety
    const safety = await ultraGuardian.checkImageSafety(design.imageUrl);
    
    if (!safety.safe) {
      // Generate alternative if unsafe
      const alternativeRequest = { ...request, context: { ...request.context, style: 'minimal' as const } };
      return await designMaster.generateDesign(alternativeRequest);
    }
    
    return design;
  }

  private async handleSafetyCheck(data: BrainTaskData) {
    const { content, userId, imageUrl } = data as { content?: string; userId?: string; imageUrl?: string; recentActions?: string[] };
    const results: Record<string, unknown> = {};
    
    if (content) {
      results.contentModeration = await ultraGuardian.moderateContent(content, userId);
    }
    
    if (imageUrl) {
      results.imageSafety = await ultraGuardian.checkImageSafety(imageUrl);
    }
    
    if (userId) {
      results.behaviorAnalysis = await ultraGuardian.analyzeUserBehavior(
        userId, 
        (data as { recentActions?: string[] }).recentActions || []
      );
    }
    
    return results;
  }

  private async handleSchoolSetup(data: BrainTaskData) {
    const { schoolName, location } = data as { schoolName: string; location?: { city: string; state: string } };
    
    // Create school profile
    const schoolProfile = await schoolUniverse.createSchoolProfile(schoolName, location);
    
    // Generate brand assets
    const brandAssets = await designMaster.generateDesign({
      type: 'stadium_background',
      context: {
        school: schoolName,
        colors: [schoolProfile.colors.primary, schoolProfile.colors.secondary]
      }
    });
    
    return {
      schoolProfile,
      brandAssets
    };
  }

  private async handleContentFix(data: BrainTaskData) {
    // Use autonomous brain to fix content
    const athleteProfile = await autonomousUltraBrain.generateAthleteProfile();
    
    // Create full identity
    const identity = await profileBot.buildIdentity({
      name: athleteProfile.name,
      school: athleteProfile.school,
      sport: athleteProfile.sport,
      position: athleteProfile.position
    });
    
    return {
      athleteProfile,
      identity
    };
  }

  private analyzeTaskResult(task: BrainTask) {
    // Generate insights based on task results
    switch (task.type) {
      case 'profile_creation':
        const profileResult = task.result as { identity?: { name: string; id: string } };
        if (profileResult?.identity) {
          this.insights.push({
            type: 'success',
            message: `Created profile for ${profileResult.identity.name}`,
            data: { profileId: profileResult.identity.id },
            actionRequired: false
          });
        }
        break;
        
      case 'safety_check':
        const safetyResult = task.result as { behaviorAnalysis?: { riskLevel: string } };
        if (safetyResult?.behaviorAnalysis?.riskLevel === 'high') {
          this.insights.push({
            type: 'warning',
            message: 'High risk user behavior detected',
            data: safetyResult.behaviorAnalysis,
            actionRequired: true
          });
        }
        break;
    }
  }

  private generateSystemInsights() {
    const brainStatus = autonomousUltraBrain.getStatus();
    
    if (brainStatus.issuesFound > 10) {
      this.insights.push({
        type: 'recommendation',
        message: 'High number of issues detected. Consider content audit.',
        data: { issuesFound: brainStatus.issuesFound },
        actionRequired: true
      });
    }
    
    if (brainStatus.learningScore > 80) {
      this.insights.push({
        type: 'success',
        message: 'AI learning score is excellent',
        data: { score: brainStatus.learningScore },
        actionRequired: false
      });
    }
  }

  // Orchestration methods
  async orchestrateNewUser(userData: {
    name: string;
    email: string;
    school: string;
    sport: string;
    age: number;
  }) {
    const tasks: string[] = [];
    
    // 1. Create school profile if needed
    tasks.push(await this.createTask('school_setup', {
      schoolName: userData.school
    }, 'high'));
    
    // 2. Create user profile
    tasks.push(await this.createTask('profile_creation', userData, 'high'));
    
    // 3. Set up safety protections
    if (userData.age < 18) {
      tasks.push(await this.createTask('safety_check', {
        userId: userData.email,
        age: userData.age
      }, 'critical'));
    }
    
    return tasks;
  }

  async generateCompleteAthletePage(athleteId: string) {
    const tasks: string[] = [];
    
    // Generate all required assets
    tasks.push(await this.createTask('design_generation', {
      request: {
        type: 'herocard',
        context: { athleteId }
      }
    }, 'medium'));
    
    tasks.push(await this.createTask('design_generation', {
      request: {
        type: 'poster',
        context: { athleteId }
      }
    }, 'medium'));
    
    tasks.push(await this.createTask('design_generation', {
      request: {
        type: 'stadium_background',
        context: { athleteId }
      }
    }, 'low'));
    
    return tasks;
  }

  getInsights(type?: BrainInsight['type']): BrainInsight[] {
    if (type) {
      return this.insights.filter(i => i.type === type);
    }
    return [...this.insights];
  }

  getTaskStatus(taskId: string): BrainTask | undefined {
    return this.processingTasks.get(taskId) || 
           this.taskQueue.find(t => t.id === taskId);
  }

  getSystemHealth(): {
    activeTasks: number;
    pendingTasks: number;
    completedToday: number;
    failureRate: number;
    botsOnline: string[];
  } {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const completedToday = this.taskQueue.filter(t => 
      t.status === 'completed' && 
      t.completedAt && 
      t.completedAt >= today
    ).length;
    
    const totalTasks = this.taskQueue.length;
    const failedTasks = this.taskQueue.filter(t => t.status === 'failed').length;
    
    return {
      activeTasks: this.processingTasks.size,
      pendingTasks: this.taskQueue.filter(t => t.status === 'pending').length,
      completedToday,
      failureRate: totalTasks > 0 ? failedTasks / totalTasks : 0,
      botsOnline: [
        'AutonomousUltraBrain',
        'DesignMaster',
        'ProfileBot',
        'SchoolUniverse',
        'UltraGuardian'
      ]
    };
  }
}

// Singleton instance
export const masterUltraBrain = new MasterUltraBrain();

// React hook for using MasterUltraBrain
export function useMasterUltraBrain() {
  const createTask = async (
    type: BrainTask['type'], 
    data: BrainTaskData, 
    priority?: BrainTask['priority']
  ) => {
    return await masterUltraBrain.createTask(type, data, priority);
  };

  const orchestrateNewUser = async (userData: Parameters<typeof masterUltraBrain.orchestrateNewUser>[0]) => {
    return await masterUltraBrain.orchestrateNewUser(userData);
  };

  const getInsights = (type?: BrainInsight['type']) => {
    return masterUltraBrain.getInsights(type);
  };

  const getSystemHealth = () => {
    return masterUltraBrain.getSystemHealth();
  };

  return {
    createTask,
    orchestrateNewUser,
    getInsights,
    getSystemHealth
  };
}