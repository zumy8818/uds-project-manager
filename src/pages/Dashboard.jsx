import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function Dashboard() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('取得エラー:', error)
    } else {
      setProjects(data)
    }
    setLoading(false)
  }

  const statusLabel = {
    draft: '下書き',
    active: '進行中',
    paused: '停滞中',
    completed: '完了',
    cancelled: '撤退',
  }

  const statusColor = {
    draft: '#888',
    active: '#22c55e',
    paused: '#f59e0b',
    completed: '#3b82f6',
    cancelled: '#ef4444',
  }

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
          プロジェクト一覧
        </h1>
        <button
          onClick={() => navigate('/projects/new')}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          ＋ 新規プロジェクト
        </button>
      </div>

      {loading ? (
        <p>読み込み中...</p>
      ) : projects.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '80px 0',
          color: '#888',
        }}>
          <p style={{ fontSize: '18px', marginBottom: '8px' }}>プロジェクトがまだありません</p>
          <p style={{ fontSize: '14px' }}>「新規プロジェクト」ボタンから作成してください</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '16px' }}>
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => navigate(`/projects/${project.id}`)}
              style={{
                backgroundColor: '#1e1e1e',
                border: '1px solid #333',
                borderRadius: '12px',
                padding: '20px 24px',
                cursor: 'pointer',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#555'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#333'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>
                  {project.name}
                </h2>
                <span style={{
                  backgroundColor: statusColor[project.status] + '22',
                  color: statusColor[project.status],
                  border: `1px solid ${statusColor[project.status]}`,
                  borderRadius: '999px',
                  padding: '4px 12px',
                  fontSize: '12px',
                }}>
                  {statusLabel[project.status] || project.status}
                </span>
              </div>
              {project.purpose && (
                <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#aaa' }}>
                  {project.purpose}
                </p>
              )}
              <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#666' }}>
                作成日：{new Date(project.created_at).toLocaleDateString('ja-JP')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard