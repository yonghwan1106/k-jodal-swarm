"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Radar,
  Brain,
  Zap,
  Mic,
  Activity,
  CheckCircle,
  Clock,
  TrendingUp,
  RefreshCw
} from "lucide-react";
import { motion } from "framer-motion";
import {
  scoutAgents,
  brainAgents,
  actionAgents,
  voiceAgents,
  swarmStatuses,
  recentActivities,
  Agent,
  AgentType,
  AgentActivity,
  activityTemplates
} from "@/lib/mock-data/agents";

const agentColors: Record<AgentType, string> = {
  scout: "#00D2FF",
  brain: "#A855F7",
  action: "#22C55E",
  voice: "#F59E0B"
};

const agentIcons: Record<AgentType, React.ElementType> = {
  scout: Radar,
  brain: Brain,
  action: Zap,
  voice: Mic
};

function AgentCard({ agent, isSelected, onClick }: { agent: Agent; isSelected: boolean; onClick: () => void }) {
  const Icon = agentIcons[agent.type];
  const color = agentColors[agent.type];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`p-4 rounded-xl cursor-pointer transition-all ${
        isSelected
          ? 'bg-gradient-to-br from-[#1E293B] to-[#0F172A] border-2'
          : 'bg-[#1E293B]/60 border border-[#334155] hover:border-opacity-70'
      }`}
      style={{ borderColor: isSelected ? color : undefined }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <div className="flex items-center gap-1">
          <div
            className={`w-2 h-2 rounded-full ${agent.status === 'running' ? 'animate-pulse' : ''}`}
            style={{ backgroundColor: agent.status === 'running' ? color : agent.status === 'waiting' ? '#F59E0B' : '#64748B' }}
          />
          <span className="text-xs text-[#64748B]">
            {agent.status === 'running' ? '실행 중' : agent.status === 'waiting' ? '대기' : '유휴'}
          </span>
        </div>
      </div>

      <h4 className="font-medium text-white mb-1">{agent.name}</h4>
      {agent.currentTask && (
        <p className="text-xs text-[#94A3B8] truncate mb-3">{agent.currentTask}</p>
      )}

      <div className="flex items-center justify-between text-xs">
        <span className="text-[#64748B]">완료 작업</span>
        <span className="text-white">{agent.tasksCompleted.toLocaleString()}</span>
      </div>
      <div className="flex items-center justify-between text-xs mt-1">
        <span className="text-[#64748B]">성공률</span>
        <span style={{ color }}>{agent.successRate}%</span>
      </div>
    </motion.div>
  );
}

function SwarmSection({ type, agents, title, description }: {
  type: AgentType;
  agents: Agent[];
  title: string;
  description: string;
}) {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const Icon = agentIcons[type];
  const color = agentColors[type];
  const swarm = swarmStatuses.find(s => s.type === type);

  return (
    <Card className="p-6 bg-[#1E293B]/40 border-[#334155]">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="w-6 h-6" style={{ color }} />
          </div>
          <div>
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="text-sm text-[#64748B]">{description}</p>
          </div>
        </div>
        <Badge style={{ backgroundColor: `${color}20`, color }}>
          {swarm?.activeAgents}/{swarm?.totalAgents} 활성
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {agents.map(agent => (
          <AgentCard
            key={agent.id}
            agent={agent}
            isSelected={selectedAgent?.id === agent.id}
            onClick={() => setSelectedAgent(agent)}
          />
        ))}
      </div>

      {swarm && (
        <div className="pt-4 border-t border-[#334155]">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-[#64748B]">총 완료 작업</span>
            <span className="text-white font-medium">{swarm.tasksCompleted.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#64748B]">대기 작업</span>
            <span style={{ color }}>{swarm.tasksInQueue}</span>
          </div>
        </div>
      )}
    </Card>
  );
}

export default function AgentsPage() {
  const [activities, setActivities] = useState<AgentActivity[]>(recentActivities);
  const [stats, setStats] = useState({
    totalTasks: 7621,
    avgResponseTime: 2.3,
    successRate: 97.8,
    activeAgents: 10
  });

  // Simulate real-time activity
  useEffect(() => {
    const generateActivity = () => {
      const types: AgentType[] = ['scout', 'brain', 'action'];
      const type = types[Math.floor(Math.random() * types.length)];
      const templates = activityTemplates[type];
      const template = templates[Math.floor(Math.random() * templates.length)];

      const newActivity: AgentActivity = {
        id: `act-${Date.now()}`,
        timestamp: new Date().toISOString(),
        agentType: type,
        agentName: `${type === 'scout' ? '탐색' : type === 'brain' ? '분석' : '작성'} 에이전트 #${Math.floor(Math.random() * 3) + 1}`,
        action: template.action,
        status: Math.random() > 0.3 ? 'completed' : 'running',
        result: template.result
          .replace('{count}', String(Math.floor(Math.random() * 20) + 1))
          .replace('{score}', String(Math.floor(Math.random() * 30) + 70))
          .replace('{price}', `${(Math.random() * 10 + 5).toFixed(1)}억`)
          .replace('{level}', ['낮음', '중간', '높음'][Math.floor(Math.random() * 3)])
          .replace('{section}', ['사업이해', '추진전략', '기술방안'][Math.floor(Math.random() * 3)])
          .replace('{passed}', String(Math.floor(Math.random() * 3) + 3))
          .replace('{total}', '5')
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 29)]);
      setStats(prev => ({
        ...prev,
        totalTasks: prev.totalTasks + 1
      }));
    };

    const timer = setInterval(generateActivity, 3000);
    return () => clearInterval(timer);
  }, []);

  const timeAgo = (timestamp: string) => {
    const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
    if (seconds < 60) return `${seconds}초 전`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}분 전`;
    return `${Math.floor(seconds / 3600)}시간 전`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Activity className="w-7 h-7 text-[#3B82F6]" />
            에이전트 모니터링
          </h1>
          <p className="text-[#94A3B8]">AI 에이전트들의 실시간 활동 상태를 확인합니다</p>
        </div>
        <Badge className="bg-[#22C55E]/20 text-[#22C55E]">
          <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
          실시간 업데이트 중
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="p-4 bg-[#1E293B]/60 border-[#334155]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#3B82F6]/20 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.totalTasks.toLocaleString()}</p>
              <p className="text-sm text-[#64748B]">총 처리 작업</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-[#1E293B]/60 border-[#334155]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#22C55E]/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#22C55E]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.successRate}%</p>
              <p className="text-sm text-[#64748B]">평균 성공률</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-[#1E293B]/60 border-[#334155]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#A855F7]/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#A855F7]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.avgResponseTime}초</p>
              <p className="text-sm text-[#64748B]">평균 응답 시간</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-[#1E293B]/60 border-[#334155]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#F59E0B]/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats.activeAgents}</p>
              <p className="text-sm text-[#64748B]">활성 에이전트</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6">
        {/* Swarm sections */}
        <div className="xl:col-span-8 space-y-4 sm:space-y-6">
          <SwarmSection
            type="scout"
            agents={scoutAgents}
            title="정찰 스웜 (Scout Swarm)"
            description="24시간 입찰 기회 탐색 및 매칭"
          />

          <SwarmSection
            type="brain"
            agents={brainAgents}
            title="두뇌 스웜 (Brain Swarm)"
            description="분석, 시뮬레이션, 전략 수립"
          />

          <SwarmSection
            type="action"
            agents={actionAgents}
            title="실행 스웜 (Action Swarm)"
            description="제안서 작성 및 검증"
          />
        </div>

        {/* Activity feed */}
        <div className="xl:col-span-4">
          <Card className="bg-[#1E293B]/40 border-[#334155] h-full">
            <div className="p-4 border-b border-[#334155]">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">실시간 활동 로그</h3>
                <Badge className="bg-[#22C55E]/20 text-[#22C55E]">Live</Badge>
              </div>
            </div>
            <ScrollArea className="h-[400px] xl:h-[calc(100vh-350px)]">
              <div className="p-3 space-y-2">
                {activities.map((activity) => {
                  const Icon = agentIcons[activity.agentType];
                  const color = agentColors[activity.agentType];

                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3 rounded-lg bg-[#334155]/30 hover:bg-[#334155]/50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${color}20` }}
                        >
                          <Icon className="w-4 h-4" style={{ color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-white truncate">
                              {activity.agentName}
                            </span>
                            <span className="text-xs text-[#64748B] flex-shrink-0">
                              {timeAgo(activity.timestamp)}
                            </span>
                          </div>
                          <p className="text-xs text-[#94A3B8] truncate">{activity.action}</p>
                          {activity.result && (
                            <p className="text-xs truncate mt-0.5" style={{ color }}>
                              {activity.result}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
}
