import Container from '@/components/ui/Container'

export default function Separator() {
  return (
    <Container>
      <div className="border-t" style={{ borderColor: 'var(--foreground)', opacity: 0.4 }} />
    </Container>
  )
}