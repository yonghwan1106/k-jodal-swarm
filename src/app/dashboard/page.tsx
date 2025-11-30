"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Radar,
  Brain,
  Zap,
  FileText,
  TrendingUp,
  Clock,
  AlertCircle,
  ArrowRight,
  Search,
  FlaskConical,
  Mic
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  swarmStatuses,
  recentActivities,
  activityTemplates,
  AgentActivity,
  AgentType
} from "@/lib/mock-data/agents";
import { mockBids, bidStats } from "@/lib/mock-data/bids";

// Agent colors
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

// Swarm Status Card
function SwarmCard({ swarm }: { swarm: typeof swarmStatuses[0] }) {
  const Icon = agentIcons[swarm.type];
  const color = agentColors[swarm.type];

  return (
    <Card className="p-5 bg-[#1E293B]/60 border-[#334155] hover:border-opacity-70 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        <Badge
          className="text-xs"
          style={{
            backgroundColor: swarm.status === 'active' ? `${color}20` : '#334155',
            color: swarm.status === 'active' ? color : '#94A3B8'
          }}
        >
          {swarm.status === 'active' ? '활성' : swarm.status === 'processing' ? '처리 중' : '대기'}
        </Badge>
      </div>

      <h3 className="font-bold text-white mb-1">{swarm.name}</h3>
      <p className="text-sm text-[#64748B] mb-4">{swarm.description}</p>

      <div className="flex items-center justify-between text-sm">
        <span className="text-[#94A3B8]">에이전트</span>
        <span className="text-white font-medium">
          {swarm.activeAgents}/{swarm.totalAgents} 활성
        </span>
      </div>

      <div className="flex items-center justify-between text-sm mt-2">
        <span className="text-[#94A3B8]">완료 작업</span>
        <span className="text-white font-medium">{swarm.tasksCompleted.toLocaleString()}</span>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-[#64748B]">대기 작업</span>
          <span style={{ color }}>{swarm.tasksInQueue}</span>
        </div>
        <Progress
          value={(swarm.tasksInQueue / 20) * 100}
          className="h-1.5 bg-[#334155]"
          style={{ '--progress-color': color } as React.CSSProperties}
        />
      </div>
    </Card>
  );
}

// Activity Feed Item
function ActivityItem({ activity }: { activity: AgentActivity }) {
  const Icon = agentIcons[activity.agentType];
  const color = agentColors[activity.agentType];

  const timeAgo = (timestamp: string) => {
    const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
    if (seconds < 60) return `${seconds}초 전`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}분 전`;
    return `${Math.floor(seconds / 3600)}시간 전`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#334155]/30 transition-colors"
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white truncate">{activity.agentName}</span>
          <Badge
            variant="outline"
            className="text-xs px-1.5 py-0"
            style={{
              borderColor: activity.status === 'running' ? color : '#475569',
              color: activity.status === 'running' ? color : '#94A3B8'
            }}
          >
            {activity.status === 'running' ? '실행 중' : activity.status === 'completed' ? '완료' : '대기'}
          </Badge>
        </div>
        <p className="text-sm text-[#94A3B8] truncate">{activity.action}</p>
        {activity.result && (
          <p className="text-xs text-[#64748B] truncate mt-0.5">{activity.result}</p>
        )}
      </div>
      <span className="text-xs text-[#64748B] flex-shrink-0">{timeAgo(activity.timestamp)}</span>
    </motion.div>
  );
}

// Recommended Bid Card
function RecommendedBidCard({ bid }: { bid: typeof mockBids[0] }) {
  return (
    <Link href={`/dashboard/bids/${bid.id}`}>
      <Card className="p-4 bg-[#1E293B]/40 border-[#334155] hover:border-[#3B82F6]/50 transition-all cursor-pointer">
        <div className="flex items-start justify-between mb-3">
          <Badge
            className="text-xs"
            style={{
              backgroundColor: bid.urgency === 'critical' ? '#EF444420' : bid.urgency === 'urgent' ? '#F59E0B20' : '#3B82F620',
              color: bid.urgency === 'critical' ? '#EF4444' : bid.urgency === 'urgent' ? '#F59E0B' : '#3B82F6'
            }}
          >
            {bid.urgency === 'critical' ? '긴급' : bid.urgency === 'urgent' ? '주의' : '일반'}
          </Badge>
          <div className="text-right">
            <p className="text-lg font-bold text-white">{bid.matchScore}점</p>
            <p className="text-xs text-[#64748B]">매칭 점수</p>
          </div>
        </div>

        <h4 className="font-medium text-white mb-1 line-clamp-2">{bid.title}</h4>
        <p className="text-sm text-[#64748B] mb-3">{bid.agency}</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white">
              {(bid.estimatedPrice / 100000000).toFixed(1)}억원
            </p>
            <p className="text-xs text-[#64748B]">예정가격</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-[#22C55E]">{bid.winProbability}%</p>
            <p className="text-xs text-[#64748B]">낙찰 확률</p>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-[#334155]">
          <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
            <Clock className="w-3.5 h-3.5" />
            <span>마감: {new Date(bid.deadline).toLocaleDateString('ko-KR')}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}

export default function DashboardPage() {
  const [activities, setActivities] = useState<AgentActivity[]>(recentActivities);

  // Simulate real-time activity generation
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

      setActivities(prev => [newActivity, ...prev.slice(0, 19)]);
    };

    const timer = setInterval(generateActivity, 4000);
    return () => clearInterval(timer);
  }, []);

  const recommendedBids = mockBids.filter(bid => bid.status === 'recommended').slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">AI 스웜 대시보드</h1>
          <p className="text-sm sm:text-base text-[#94A3B8]">실시간 AI 에이전트 활동 현황</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="outline" className="border-[#334155] text-white hover:bg-[#1E293B] text-sm">
            <Search className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">새 입찰 검색</span>
          </Button>
          <Link href="/dashboard/simulation">
            <Button className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white text-sm">
              <FlaskConical className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">시뮬레이션 실행</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="p-3 sm:p-4 bg-[#1E293B]/60 border-[#334155]">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#3B82F6]/20 flex items-center justify-center">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#3B82F6]" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-white">{bidStats.todayNew}</p>
              <p className="text-xs sm:text-sm text-[#64748B]">오늘 신규 공고</p>
            </div>
          </div>
        </Card>

        <Card className="p-3 sm:p-4 bg-[#1E293B]/60 border-[#334155]">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#22C55E]/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#22C55E]" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-white">{bidStats.recommended}</p>
              <p className="text-xs sm:text-sm text-[#64748B]">AI 추천 공고</p>
            </div>
          </div>
        </Card>

        <Card className="p-3 sm:p-4 bg-[#1E293B]/60 border-[#334155]">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#A855F7]/20 flex items-center justify-center">
              <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-[#A855F7]" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-white">{bidStats.analyzing}</p>
              <p className="text-xs sm:text-sm text-[#64748B]">분석 진행 중</p>
            </div>
          </div>
        </Card>

        <Card className="p-3 sm:p-4 bg-[#1E293B]/60 border-[#334155]">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#F59E0B]/20 flex items-center justify-center">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#F59E0B]" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-white">{bidStats.deadlineSoon}</p>
              <p className="text-xs sm:text-sm text-[#64748B]">마감 임박</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6">
        {/* Swarm Status */}
        <div className="xl:col-span-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg font-semibold text-white">스웜 현황</h2>
            <Link href="/dashboard/agents" className="text-sm text-[#3B82F6] hover:underline flex items-center gap-1">
              상세 모니터링 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {swarmStatuses.map((swarm) => (
              <SwarmCard key={swarm.type} swarm={swarm} />
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="xl:col-span-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg font-semibold text-white">실시간 활동</h2>
            <Badge className="bg-[#22C55E]/20 text-[#22C55E]">Live</Badge>
          </div>
          <Card className="bg-[#1E293B]/40 border-[#334155] h-[280px] sm:h-[320px]">
            <ScrollArea className="h-full">
              <div className="p-2">
                <AnimatePresence>
                  {activities.map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))}
                </AnimatePresence>
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>

      {/* Recommended Bids */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-white">AI 추천 입찰공고</h2>
          <Link href="/dashboard/bids" className="text-sm text-[#3B82F6] hover:underline flex items-center gap-1">
            전체 보기 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {recommendedBids.map((bid) => (
            <RecommendedBidCard key={bid.id} bid={bid} />
          ))}
        </div>
      </div>
    </div>
  );
}
